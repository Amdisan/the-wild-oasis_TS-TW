import { supabase } from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

type CreateEditCabinArgsType = {
  cabin: {
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    description: string;
    image: string | File;
  };
  id?: number;
};

export async function createEditCabin({ cabin, id }: CreateEditCabinArgsType) {
  const hasImagePath =
    typeof cabin.image === 'string'
      ? cabin.image.startsWith(supabaseUrl)
      : false;

  const imageName =
    typeof cabin.image !== 'string'
      ? `${Math.random()}-${cabin.image.name}`.replaceAll('/', '')
      : undefined;

  const imagePath = hasImagePath
    ? (cabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabin_images/${imageName}`;

  //1 create/edit cabin
  let query;

  //A create
  if (!id) {
    query = supabase.from('cabins').insert([{ ...cabin, image: imagePath }]);
  }

  // B edit
  if (id) {
    query = supabase
      .from('cabins')
      .update({ ...cabin, image: imagePath })
      .eq('id', id)
      .select();
  }

  if (!query) {
    console.log('Error, cant make query for edit/create');
    return;
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created');
  }

  //2 upload image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin_images')
      .upload(imageName!, cabin.image);

    //3 delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.log(storageError);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created',
      );
    }
  }
  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted');
  }
  return data;
}

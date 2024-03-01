import { FocusEvent } from 'react';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {}, //empty object for initial render to avoid error
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(
    e: FocusEvent<HTMLInputElement, Element>,
    field: string,
  ) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [field]: Number(value) });
  }

  return (
    <form className="form">
      <FormRow label="Minimum nights/booking">
        <input
          className="input"
          type="number"
          id="min-nights"
          defaultValue={minBookingLength!}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <input
          className="input"
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength!}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <input
          className="input"
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking!}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <input
          className="input"
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice!}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
          disabled={isUpdating}
        />
      </FormRow>
    </form>
  );
}

export default UpdateSettingsForm;

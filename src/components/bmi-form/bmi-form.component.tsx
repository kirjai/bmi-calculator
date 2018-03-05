import { Component, State, Event, EventEmitter } from '@stencil/core';

export interface FormValues {
  weight: string;
  height: string;
}

@Component({
  tag: 'bmi-form',
})
export class BmiForm {
  @State()
  formValues: FormValues = {
    weight: '',
    height: '',
  };

  @Event() bmiFormSubmitted: EventEmitter<FormValues>;

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>
          Weight (kg)
          <input
            type="number"
            placeholder="75"
            value={this.formValues.weight}
            onInput={this.valueChangeHandler('weight')}
            required
          />
        </label>
        <label>
          Height (cm)
          <input
            type="number"
            placeholder="175"
            value={this.formValues.height}
            onInput={this.valueChangeHandler('height')}
            required
          />
        </label>
        <div class="button-container">
          <button
            type="submit"
            disabled={!this.validateFormValues(this.formValues)}
          >
            Proceed
          </button>
        </div>
      </form>
    );
  }

  private valueChangeHandler = (prop: keyof FormValues) => (event: Event) => {
    this.formValues = {
      ...this.formValues,
      [prop]: (event.target as HTMLInputElement).value,
    };
  };

  private submit = (event: Event) => {
    event.preventDefault();
    this.bmiFormSubmitted.emit(this.formValues);
  };

  private validateFormValues = (values: FormValues) => {
    return !!(values.weight && values.height);
  };
}

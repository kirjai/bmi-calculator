import { Component, State, Event, EventEmitter, Listen } from '@stencil/core';
import { lbsToKg, feetToCm } from '../../helpers/helpers';

export interface FormSubmitEvent {
  weight: string;
  height: string;
}

interface FormValues extends FormSubmitEvent {
  inches: string;
}

enum Units {
  Metric = 'Metric',
  Imperial = 'Imperial',
}

const toggleOptions = [Units.Metric, Units.Imperial];

const unitsOptions = {
  [Units.Metric]: {
    weight: 'kg',
    height: 'cm',
    weightPlaceholder: '75',
    heightPlaceholder: '175',
  },
  [Units.Imperial]: {
    weight: 'lbs',
    height: 'feet',
    weightPlaceholder: '175',
    heightPlaceholder: `6`,
  },
};

@Component({
  tag: 'bmi-form',
})
export class BmiForm {
  @State()
  formValues: FormValues = {
    weight: '',
    height: '',
    inches: '',
  };
  @State() units = Units.Metric;

  @Event() bmiFormSubmitted: EventEmitter<FormSubmitEvent>;

  @Listen('toggleValueChange')
  toggleValueChange(event: CustomEvent<Units>) {
    this.units = event.detail;
  }

  render() {
    const selectedUnitOptions = unitsOptions[this.units];
    return (
      <div class="form-container">
        <bmi-toggle options={toggleOptions} active={this.units} />
        <form onSubmit={this.submit} class={this.units.toLowerCase()}>
          <label>
            Weight ({selectedUnitOptions.weight})
            <input
              type="number"
              placeholder={selectedUnitOptions.weightPlaceholder}
              value={this.formValues.weight}
              onInput={this.valueChangeHandler('weight')}
              required
            />
          </label>
          <label htmlFor="height">Height ({selectedUnitOptions.height})</label>
          <div class="height-container">
            <input
              id="height"
              type="number"
              placeholder={selectedUnitOptions.heightPlaceholder}
              value={this.formValues.height}
              onInput={this.valueChangeHandler('height')}
              class="height"
              required
            />
            {this.units === Units.Imperial ? (
              <input
                type="number"
                placeholder="0"
                value={this.formValues.inches}
                onInput={this.valueChangeHandler('inches')}
                class="height"
              />
            ) : null}
          </div>
          <div class="button-container">
            <button
              class="main-button"
              type="submit"
              disabled={!this.validateFormValues(this.formValues)}
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
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
    const { weight, height, inches } = this.formValues;
    let values: FormSubmitEvent = { weight, height };
    if (this.units === Units.Imperial) {
      values = {
        weight: String(lbsToKg(Number(weight))),
        height: String(feetToCm(Number(height), Number(inches))),
      };
    }
    this.bmiFormSubmitted.emit(values);
  };

  private validateFormValues = (values: FormValues) => {
    return !!(values.weight && values.height);
  };
}

import { Component, State, Event, EventEmitter, Listen } from '@stencil/core';
import { lbsToKg, feetToCm } from '../../helpers/helpers';

export interface FormSubmitEvent {
  weight: number;
  height: number;
  originalWeight: number;
}

interface FormValues {
  weight: string;
  height: string;
  originalWeight: string;
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
    originalWeight: '',
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
          <label>
            Original weight ({selectedUnitOptions.weight}) (optional)
            <input
              type="number"
              placeholder={selectedUnitOptions.weightPlaceholder}
              value={this.formValues.originalWeight}
              onInput={this.valueChangeHandler('originalWeight')}
            />
          </label>
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
    const { weight, height, inches, originalWeight } = this.formValues;
    let values: FormSubmitEvent = {
      weight: Number(weight),
      height: Number(height),
      originalWeight: Number(originalWeight),
    };
    if (this.units === Units.Imperial) {
      values = {
        weight: lbsToKg(Number(weight)),
        height: feetToCm(Number(height), Number(inches)),
        originalWeight: lbsToKg(Number(originalWeight)),
      };
    }
    this.bmiFormSubmitted.emit(values);
  };

  private validateFormValues = (values: FormValues) => {
    return !!(values.weight && values.height);
  };
}

import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { getRange } from '../../helpers/helpers';

@Component({
  tag: 'bmi-result',
  styleUrl: 'result.styles.scss',
})
export class Result {
  @Prop() bmi: number;
  /**
   * Difference in original and new BMI
   */
  @Prop() difference: number | undefined;
  @Event() backToForm: EventEmitter<void>;

  render() {
    const bmi = this.bmi;
    const radius = 100;
    const cirumference = Math.PI * (radius * 2);
    const x = (100 - bmi) / 100 * cirumference;
    const range = getRange(bmi);

    return (
      <div>
        <div style={{ position: 'relative' }}>
          <div class="circle-container">
            <p class="number">{bmi.toFixed(1)}</p>
            <p class="secondary-text">BMI</p>
            {this.difference ? (
              <p class="secondary-text">
                {this.difference > 0 ? '+' : null}
                {this.difference.toFixed(1)}
              </p>
            ) : null}
          </div>
          <svg width="100%" height="270px" transform="rotate(-90)">
            <circle
              stroke="white"
              stroke-width="2"
              r={radius}
              cx="50%"
              cy="50%"
              fill="transparent"
              style={{ opacity: '.2' }}
            />
            <circle
              stroke="white"
              stroke-width="7"
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke-dashoffset={x}
              stroke-dasharray={cirumference}
            />
          </svg>
        </div>

        <p class="result">{range.name}</p>

        <button class="main-button" onClick={() => this.backToForm.emit()}>
          Back
        </button>
      </div>
    );
  }
}

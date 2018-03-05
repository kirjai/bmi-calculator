import { Component, Listen, State } from '@stencil/core';
import { FormValues } from '../bmi-form/bmi-form.component';
import { calculateBMI } from '../../helpers/helpers';

enum AppState {
  Form,
  Result,
}

@Component({
  tag: 'bmi-app',
  styleUrl: 'app.styles.scss',
})
export class App {
  @State() appState = AppState.Form;
  @State() bmi: number;

  @Listen('bmiFormSubmitted')
  calculate(event: CustomEvent<FormValues>) {
    const { weight, height } = event.detail;
    this.bmi = calculateBMI(Number(weight), Number(height));
    this.appState = AppState.Result;
  }

  @Listen('backToForm')
  backToForm(_event: CustomEvent<void>) {
    this.appState = AppState.Form;
  }

  render() {
    return (
      <div class="container">
        <h1>Body mass index (BMI)</h1>
        <p>A measure of body fat in adults</p>

        {this.appState === AppState.Form ? <bmi-form /> : null}

        {this.appState === AppState.Result ? (
          <bmi-result bmi={this.bmi} />
        ) : null}
      </div>
    );
  }
}

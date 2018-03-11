import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'bmi-toggle',
  styleUrl: 'toggle.styles.scss',
})
export class Toggle {
  @Prop() options: string[];
  @Prop() active: string;
  @Event() toggleValueChange: EventEmitter<string>;

  render() {
    return this.options.map(option => (
      <button
        class={`toggle ${this.active === option ? 'active' : ''}`}
        onClick={() => this.toggleValueChange.emit(option)}
      >
        {option}
      </button>
    ));
  }
}

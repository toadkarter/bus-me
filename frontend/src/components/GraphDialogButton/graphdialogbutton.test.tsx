import {render, RenderResult, screen} from '@testing-library/react';
import GraphDialogButton from './GraphDialogButton';
import {UserEvent} from "@testing-library/user-event/dist/types/setup";
import userEvent from "@testing-library/user-event";

// Setup function that renders the main component.
const setup = (prediction: number | undefined,
               graphPredictions: number[] | undefined
              ): RenderResult => render(
    <GraphDialogButton
      prediction={prediction}
      graphPredictions={graphPredictions}
    />
  )
;

describe('<GraphPredictionButton/> It should show the button', () => {
  it('should show the button', () => {
    expect.assertions(1);
    setup(5, [1, 2, 3]);

    expect(screen.getByRole('button', {name: /journey times/i})).toBeInTheDocument();
  })
})

describe('<GraphPredictionButton/> It should be enabled if prediction has been made', () => {
  it('should be enabled if both prediction and graph predictions are filled', () => {
    expect.assertions(1);
    setup(5, [1, 2, 3]);

    expect(screen.getByRole('button', {name: /journey times/i}))
      .not.toHaveClass('Mui-disabled');
  });

  it('should be disabled if both prediction and graph predictions are not filled', () => {
    expect.assertions(1);
    setup(undefined, undefined);

    expect(screen.getByRole('button', {name: /journey times/i}))
      .toHaveClass('Mui-disabled');
  })
});

describe('<GraphPredictionButton/> It should toggle the graph dialog', () => {
  it('should show the graph dialog when pressed', async () => {
    expect.assertions(2);
    setup(5, [1, 2, 3]);

    const toggleButton: HTMLElement = screen.getByRole('button', {name: /journey times/i});
    const view: UserEvent = userEvent.setup();
    await view.click(toggleButton);

    expect(screen.getByText(/journey durations/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /back to map/i})).toBeInTheDocument();
  })
})
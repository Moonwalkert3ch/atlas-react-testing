import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { PlayListItem } from '../components/PlayListItem';

const onClick = vi.fn();

test('PlayListItem renders correctly when current', () => {
  const { container } = render(
    <PlayListItem 
      title='Painted in Blue' 
      artist='Soul Canvas' 
      duration='5:55' 
      onClick={onClick} 
    />
  );
  expect(container).toMatchSnapshot();
});

test('PlayListItem renders correctly when not current', () => {
  const { container } = render(
    <PlayListItem 
      title='Tidal Drift' 
      artist='Echoes of the Sea' 
      duration='8:02' 
      isCurrent={false} 
      onClick={onClick} 
    />
  );
  expect(container).toMatchSnapshot();
});

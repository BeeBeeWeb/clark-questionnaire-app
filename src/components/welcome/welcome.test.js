import { render, screen } from '@testing-library/react';
import Welcome from './welcome.component';

it('should render welcome component title and description', () => {
  render(<Welcome name="test title" description="test description" />);
  const titleElement = screen.getByText('test title');
  const descriptionElement = screen.getByText('test description');

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});
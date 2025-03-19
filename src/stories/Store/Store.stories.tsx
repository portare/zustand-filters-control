import { StoreControls, StoreProvider } from './Store';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Store',
  component: StoreProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StoreProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    children: <StoreControls />,
  },
};

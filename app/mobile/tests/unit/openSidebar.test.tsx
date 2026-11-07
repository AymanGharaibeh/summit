import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import PostsHeader from '../../src/components/posts/PostsHeader';

test('pressing the sidebar button calls onMenu once', async () => {
  const onMenu = jest.fn();

  await render(<PostsHeader onMenu={onMenu} onCreate={jest.fn()} onSearch={jest.fn()} />);
  await fireEvent.press(screen.getByLabelText('Open sidebar'));

  expect(onMenu).toHaveBeenCalledTimes(1);
});

import {configure} from '@storybook/react';

const req = require.context('../src', true, /.story\.jsx$/);

function loadStories() {
  require('./index');
  req.keys().forEach(req);
}

configure(loadStories, module);

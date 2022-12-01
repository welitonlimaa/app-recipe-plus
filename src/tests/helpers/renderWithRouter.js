import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function renderWithRouter(tools, historyStore) {
  return (
    <Router history={ historyStore }>
      { tools }
    </Router>
  );
}

export function renderWithRedux(tools, historyStore = {}) {
  const { initialState = {}, localstore = createStore(rootReducer, initialState),
  } = historyStore;

  return { ...render(withRedux(tools, localstore)),
    localstore,
  };
}

export function renderWithR(
  tools,
  { entries = ['/'], historyStore = createMemoryHistory({ entries }) } = {},
) {
  return { ...render(renderWithRouter(tools, historyStore)),
    historyStore,
  };
}

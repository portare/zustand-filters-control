import { FiltersProvider, TFiltersLoader, useFilters } from '../lib/main';

const Component = () => {
  const store = useFilters();

  return (
    <>
      <pre>{JSON.stringify(store, undefined, 4)}</pre>
      <div>
        <button onClick={() => store.loadInitialFilters(loadFilters)}>loadInitialFilters</button>
      </div>
      <div>
        <button
          onClick={() => {
            store.resetAllFilters();
          }}
        >
          resetAllFilters
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            store.resetToInitial();
          }}
        >
          resetToInitial
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            store.setTmpFilter('state', 123);
          }}
        >
          setTmpFilter
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            store.setTmpFilters({
              name: 'Name',
              age: 33,
            });
          }}
        >
          setTmpFilters
        </button>
      </div>
    </>
  );
};

const loadFilters: TFiltersLoader = async () => {
  return new Promise((res) => {
    setTimeout(
      () =>
        res({
          field1: 'value1',
        }),
      2000,
    );
  });
};

export const App = () => {
  return (
    <FiltersProvider>
      <Component />
    </FiltersProvider>
  );
};

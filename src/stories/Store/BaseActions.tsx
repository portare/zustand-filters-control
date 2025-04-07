import { TFiltersLoader, useFilters } from '../../../lib/components/Store';

export const BaseActions = () => {
  const store = useFilters();

  const loadFilters: TFiltersLoader = async () => {
    return new Promise((res) => {
      setTimeout(
        () =>
          res({
            name: 'Name_0',
            age: 22,
          }),
        2000,
      );
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <pre>{JSON.stringify(store, undefined, 4)}</pre>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button onClick={() => store.loadInitialFilters(loadFilters)}>loadInitialFilters</button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button
            onClick={() => {
              store.resetAllFilters();
            }}
          >
            resetAllFilters
          </button>

          <button
            onClick={() => {
              store.resetToInitial();
            }}
          >
            resetToInitial
          </button>

          <button
            onClick={() => {
              store.reset();
            }}
          >
            reset
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button
            onClick={() => {
              store.setTmpFilter('name', 'Name_1');
            }}
          >
            setTmpFilter
          </button>

          <button
            onClick={() => {
              store.setTmpFilters({
                name: 'Name_2',
                age: 33,
              });
            }}
          >
            setTmpFilters
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button
            onClick={() => {
              store.setFilter('name', 'Name_1');
            }}
          >
            setFilter
          </button>

          <button
            onClick={() => {
              store.setFilters({
                name: 'Name_2',
                age: 33,
              });
            }}
          >
            setFilters
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button
            onClick={() => {
              store.applyFromTmp();
            }}
          >
            applyFromTmp
          </button>
        </div>
      </div>
    </div>
  );
};

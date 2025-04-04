import { TFiltersLoader, useFilters } from '../../../lib/components/Store';

export const ExternalStorage = () => {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 16,
        }}
      >
        <div
          style={{
            borderRadius: 8,
            paddingInline: 16,
            backgroundColor: 'lightblue',
          }}
        >
          <pre>external</pre>
          <pre>{JSON.stringify(store.storage?.getValues(), undefined, 4)}</pre>
        </div>
        <div
          style={{
            borderRadius: 8,
            paddingInline: 16,
            backgroundColor: 'lightblue',
          }}
        >
          <pre>zustand</pre>
          <pre>{JSON.stringify(store, undefined, 4)}</pre>
        </div>
      </div>
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

        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button
            onClick={() => {
              store.updateFromStorage();
            }}
          >
            updateFromStorage
          </button>
        </div>
      </div>
    </div>
  );
};

import { type ChangeEvent, type FormEventHandler, useEffect } from 'react';
import { TFiltersLoader, useFilters } from '../../../lib/components/Store';

export const BaseForm = () => {
  const store = useFilters();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    store.applyFromTmp();
  };

  const onReset = () => {
    store.resetAllFilters();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    store.setTmpFilter(name, e.target.value);
  };

  const loadFilters: TFiltersLoader = async () => {
    return new Promise((res) => {
      setTimeout(
        () =>
          res({
            name: 'Name',
            age: 22,
          }),
        2000,
      );
    });
  };

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.storageArea !== localStorage || event.key !== 'form_filters') {
        return;
      }

      store.setFilters(JSON.parse(event.newValue) || {});
    };
    window.addEventListener('storage', handler, false);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{
          padding: 8,
          border: '1px solid #F0F0F0',
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <label>
            Search:
            <input
              name="search"
              onChange={(e) => {
                onChange(e, 'search');
              }}
              value={String(store.tmpFilters.search ?? '')}
            />
          </label>
          <label>
            Name:
            <input
              name="name"
              onChange={(e) => {
                onChange(e, 'name');
              }}
              value={String(store.tmpFilters.name ?? '')}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              onChange={(e) => {
                onChange(e, 'age');
              }}
              value={String(store.tmpFilters.age ?? '')}
            />
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
          }}
        >
          <button type="submit">submit</button>
          <button
            type="button"
            onClick={onReset}
          >
            reset
          </button>
        </div>
      </form>

      <div
        style={{
          padding: 8,
          border: '1px solid #F0F0F0',
          borderRadius: 8,
        }}
      >
        <button
          type="button"
          onClick={() => store.loadInitialFilters(loadFilters)}
          style={{
            marginBottom: 16,
          }}
        >
          loadInitialFilters
        </button>
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
      </div>
    </>
  );
};

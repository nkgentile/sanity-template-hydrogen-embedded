/**
 * To keep the worker bundle size small, only load
 * the Studio and its configuration in the client
 */
import {useLocation} from '@remix-run/react';
import {
  type SourceOptions,
  type StudioProps,
  Studio,
  defineConfig,
} from 'sanity';

/**
 * Prevent a consumer from importing into a worker/server bundle.
 */
if (typeof document === 'undefined') {
  throw new Error(
    'Sanity Studio can only run in the browser. Please check that this file is not being imported into a worker or server bundle.',
  );
}

type SanityStudioProps = Omit<StudioProps, 'config'> &
  Pick<SourceOptions, 'projectId' | 'dataset'>;

function SanityStudio(props: SanityStudioProps) {
  const {projectId, dataset, ...rest} = props;
  const location = useLocation();
  const basePath = location.pathname;

  const config = defineConfig({
    projectId,
    dataset,

    basePath,
  });

  return (
    <div id="sanity">
      <Studio {...rest} config={config} unstable_globalStyles />
    </div>
  );
}

export {SanityStudio};
/**
 * `React.lazy` expects the component as the default export
 * @see https://react.dev/reference/react/lazy
 */
export default SanityStudio;

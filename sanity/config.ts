import {visionTool} from '@sanity/vision';
import {defineConfig, type SingleWorkspace} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schema} from './schema';

/**
 * Configuration options that will be passed in
 * from the environment or application
 */
type SanityConfig = Pick<
  SingleWorkspace,
  'projectId' | 'dataset' | 'title' | 'basePath'
>;

/**
 * Wrap whatever Sanity Studio configuration your project requires.
 *
 * In this example, it's a single workspace but adjust as necessary.
 */
export function defineSanityConfig(config: SanityConfig) {
  /**
   * Prevent a consumer from importing into a worker/server bundle.
   */
  if (typeof document === 'undefined') {
    throw new Error(
      'Sanity Studio can only run in the browser. Please check that this file is not being imported into a worker or server bundle.',
    );
  }

  return defineConfig({
    ...config,
    plugins: [structureTool(), visionTool()],
    schema,
  });
}

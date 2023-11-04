import { modules } from '@core-js/compat/src/data.mjs';
import { getListOfDependencies } from './get-dependencies.mjs';

for (const module of modules) console.log(module, await getListOfDependencies(module));
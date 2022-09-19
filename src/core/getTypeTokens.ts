import { readFile, rm } from 'fs/promises';
import { resolve } from 'path';
import { Application, TSConfigReader, TypeDocReader, ContainerReflection } from 'typedoc'
import { Token } from './getTypeOptions';

interface Option {
  entryFile: string,
  tsconfig: string
}
export async function getTypeTokens (option: Option): Promise<Token | null> {
    const { entryFile, tsconfig } = option
    const app = new Application();

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TSConfigReader());
    app.options.addReader(new TypeDocReader());

    app.bootstrap({
        // typedoc options here
        entryPoints: [entryFile],
        entryPointStrategy: 'resolve',
        tsconfig,
    });

    const project = app.convert();

    if (project) {
        const ser = app.serializer.projectToObject(project);
        console.log('ser json', JSON.stringify(ser, null, '\t'))
        // @ts-ignore
        return ser
    }
    return null
}
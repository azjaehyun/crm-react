import React from 'react';

const defaultRequires = name => {
    throw new Error(`Could not require '${name}'. The 'requires' function was not provided.`);
};

// https://github.com/Paciolan/remote-module-loader/blob/master/src/lib/loadRemoteModule.js

export function loadRemoteComponent(url) {
    return fetch(url)
        .then(response => response.text())
        .then(text => {
            // Define exports and require method for eval(text)
            const exports = {};
            function require(name) {
                if (name === 'react') {
                    return React;
                }
                throw new Error('Does not support modules other than "react" in remote component');
            }
            eval(text);
            return exports.__esModule ? exports.default : exports;

            // const exports = {};
            // const module = { exports };
            //
            // function require(name) {
            //     if (name === 'react') {
            //         return React;
            //     }
            //     throw new Error('Does not support modules other than "react" in remote component');
            // }
            //
            // const func = new Function('require', 'module', 'exports', text);
            // func(module, exports);
            // return module.exports;
        });
}

// https://codepen.io/qborreda/pen/JZyEaj
// export function loadRemoteComponent(url){
//     return fetch(url)
//         .then(res=>res.text())
//         .then(source=>{
//             var exports = {}
//             function require(name){
//                 if(name == 'react') return React
//                 else throw `You can't use modules other than "react" in remote component.`
//             }
//             const transformedSource = Babel.transform(source, {
//                 presets: ['react', 'es2015', 'stage-2']
//             }).code
//             eval(transformedSource)
//             return exports.__esModule ? exports.default : exports
//         })
// }

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {createSerializer} from "enzyme-to-json";

/* La configuración de Enzyme está disponible en https://enzymejs.github.io/enzyme/ */
Enzyme.configure({adapter: new Adapter()});

/* La configuración del serializer de enzyme-to-json está disponible en https://www.npmjs.com/package/enzyme-to-json */
expect.addSnapshotSerializer(createSerializer({mode: "deep"}));

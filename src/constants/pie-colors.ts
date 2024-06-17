import { blue, cyan, geekblue, gold, green, lime, magenta,orange, purple, red, volcano, yellow } from '@ant-design/colors';

const colorFamilies = [red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta];
const colors: string[] = [];

colorFamilies.forEach(color => colors.push(...[color[3], color[5], color[7]]));

export const pieColors = [...colors];

# angular-json-pretty-print
This component should be use to print the JSON object or JSON text in pretty way. With this component is possible to change the color in each type of element within of JSON object and expand and retract objects and arrays.

## Installation

To install witn Bower:

```sh
$ bower install angular-json-pretty-print --save-dev
```

## Example

To use this component is need call it in a template to passing a JSON object that should exist in a controller, directive or another stuff of project where component was installed.

```sh
------- scope -------
$scope.jsonValue = '{"key3": "value3", "key2": 2, "key1": {"sub":1}, "key4": ["teste1","teste2","teste3"]}';

------ template ------
<rm-json-pretty-print json="{{jsonValue}}">
</rm-json-pretty-print>
```

Is possible inform some options to change the style of component.

- `keyColor` - change the color of a key in JSON object printed. The standard color is #A52A2A.
- `keyHighlight` - change the highlight color of a key in JSON object printed. The standard color is #FFFFFF.
- `valueColor` - change the color of a value in JSON object printed. The standard color is #000080.
- `valueHighlight` - change the highlight color of a value in JSON object printed. The standard color is #FFFFFF.
- `stringColor` - change the color of a string value in JSON object printed. The standard color is #C0FF3E.
- `stringHighlight` - change the highlight color of a string value in JSON object printed. The standard color is #FFFFFF.
- `braceColor` - change the color of a brace in JSON object printed. The standard color is #000000.
- `braceHighlight` - change the highlight color of a brace in JSON object printed. The standard color is #FFFFFF.
- `bracketColor` - change the color of a bracket in JSON object printed. The standard color is #000000.
- `bracketHighlight` - change the highlight color of a bracket in JSON object printed. The standard color is #FFFFFF.

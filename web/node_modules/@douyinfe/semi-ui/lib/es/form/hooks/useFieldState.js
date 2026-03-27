import useFormState from './useFormState';
import * as ObjectUtil from '@douyinfe/semi-foundation/lib/es/utils/object';
const buildFieldState = (formState, field) => ({
  value: ObjectUtil.get(formState.values, field),
  error: ObjectUtil.get(formState.errors, field),
  touched: ObjectUtil.get(formState.touched, field)
});
function useFieldState(field) {
  const formState = useFormState();
  const fieldState = buildFieldState(formState, field);
  return fieldState;
}
export default useFieldState;
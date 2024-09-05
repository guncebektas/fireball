// @ts-ignore
import classnames from 'classnames';
import omit from 'lodash/omit';
import {BaseForm} from 'uniforms';
import {baseFormClasses} from "./baseFormClasses";

function Tailwind(parent: any) {
  class _ extends parent {
    static Tailwind = Tailwind;

    static displayName = `Tailwind${parent.displayName}`;

    getContextState() {
      return {...super.getContextState(), grid: this.props.grid};
    }

    getNativeFormProps() {
      const error = this.getContextError();
      const props = super.getNativeFormProps();

      return {
        ...omit(props, ['grid']),
        className: classnames(
          baseFormClasses, {
            error
          },
          props.className
        ),
      };
    }
  }

  return _ as unknown as typeof BaseForm;
}

export default Tailwind(BaseForm);

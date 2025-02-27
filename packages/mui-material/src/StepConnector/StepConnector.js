import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import capitalize from '../utils/capitalize';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { getStepConnectorUtilityClass } from './stepConnectorClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, alternativeLabel, active, completed, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      orientation,
      alternativeLabel && 'alternativeLabel',
      active && 'active',
      completed && 'completed',
      disabled && 'disabled',
    ],
    line: ['line', `line${capitalize(orientation)}`],
  };

  return composeClasses(slots, getStepConnectorUtilityClass, classes);
};

const StepConnectorRoot = styled('div', {
  name: 'MuiStepConnector',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.alternativeLabel && styles.alternativeLabel,
      ownerState.completed && styles.completed,
    ];
  },
})(({ ownerState }) => ({
  flex: '1 1 auto',
  ...(ownerState.orientation === 'vertical' && {
    marginLeft: 12, // half icon
  }),
  ...(ownerState.alternativeLabel && {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  }),
}));

const StepConnectorLine = styled('span', {
  name: 'MuiStepConnector',
  slot: 'Line',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.line, styles[`line${capitalize(ownerState.orientation)}`]];
  },
})(({ ownerState, theme }) => ({
  display: 'block',
  borderColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  ...(ownerState.orientation === 'horizontal' && {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  }),
  ...(ownerState.orientation === 'vertical' && {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24,
  }),
}));

const StepConnector = React.forwardRef(function StepConnector(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiStepConnector' });
  const { className, ...other } = props;

  const { alternativeLabel, orientation = 'horizontal' } = React.useContext(StepperContext);
  const { active, disabled, completed } = React.useContext(StepContext);

  const ownerState = { ...props, alternativeLabel, orientation, active, completed, disabled };
  const classes = useUtilityClasses(ownerState);

  return (
    <StepConnectorRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <StepConnectorLine className={classes.line} ownerState={ownerState} />
    </StepConnectorRoot>
  );
});

StepConnector.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default StepConnector;

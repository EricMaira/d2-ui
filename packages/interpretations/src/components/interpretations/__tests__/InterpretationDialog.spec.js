import React from 'react';
import { mount } from 'enzyme';
import InterpretationDialog from '../InterpretationDialog';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { getStubContext, getMuiTheme } from '../../../../config/test-context';

const context = getStubContext();
const childContextTypes = {muiTheme: PropTypes.object, d2: PropTypes.object};

const interpretation = {
    name: "LOECMJN3DRF",
    id: "LOECMJN3DRF",
    likes: 1,
    text: "Some interpretation",
    comments: [{
        id: "tEvCRL8r9KW",
        text: "Some comment",
        user: {
            id: "xE7jOejl9FI",
            displayName: "John Traore"
        }
    }],
    save: jest.fn(() => Promise.resolve(interpretation)),
};

const renderComponent = (partialProps = {}) => {
    const baseProps = {
        interpretation: interpretation,
        onSave: jest.fn(),
        onClose: jest.fn(),
    };
    const props = {...baseProps, ...partialProps};
    const muiTheme = getMuiTheme();

    return mount(
        <MuiThemeProvider theme={muiTheme}>
            <InterpretationDialog {...props} />
        </MuiThemeProvider>,
        {context, childContextTypes}
    );
};

let interpretationDialog;

describe('Interpretations: Interpretations -> InterpretationDialog component', () => {
    beforeEach(() => {
        interpretationDialog = renderComponent();
    });

    it('should render a text field with the interpretation as initial text', () => {
        const textField = interpretationDialog.find("TextField");
        expect(textField).toHaveProp("value", interpretation.text);
    });

    describe("when save is clicked with new text", () => {
        beforeEach(() => {
            interpretationDialog.find("TextField").props().onChange({target: {value: "new text"}});
            interpretationDialog.find("InterpretationDialog").instance().save();
        });

        it("should call onSave with the updated interpretation", () => {
            const onSave = interpretationDialog.find("InterpretationDialog").instance().props.onSave;
            expect(onSave).toHaveBeenCalledTimes(1);
            const onSaveCall = onSave.mock.calls[0];
            expect(onSaveCall[0]).toEqual(expect.objectContaining({
                id: interpretation.id,
                text: "new text",
            }));
        });
    });

    describe("when cancel is clicked with new text", () => {
        beforeEach(() => {
            interpretationDialog.find("TextField").props().onChange({target: { value: "new text"}});
            interpretationDialog.find("InterpretationDialog").instance().cancel();
        });

        it("should call onClose", () => {
            const onClose = interpretationDialog.find("InterpretationDialog").instance().props.onClose;
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it("should not call onSave", () => {
            const onSave = interpretationDialog.find("InterpretationDialog").instance().props.onSave;
            expect(onSave).toHaveBeenCalledTimes(0);
        });
    });
});

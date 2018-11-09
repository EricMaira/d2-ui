import React from 'react';
import { shallow } from 'enzyme';
import { DimensionLabel } from '../DimensionLabel';
import { RemoveDimensionButton } from '../DimensionLabel';

describe('The DimensionList component ', () => {
    let props;
    let shallowDimLabel;
    const dimLabel = () => {
        if (!shallowDimLabel) {
            shallowDimLabel = shallow(<DimensionLabel {...props} />);
        }
        return shallowDimLabel;
    };
    beforeEach(() => {
        props = {
            openDialog: jest.fn(),
            id: 'idstring',
            isSelected: false,
            isDeactivated: false,
            name: 'labelname',
            removeDimension: jest.fn(),
            children: [],
        };
        shallowDimLabel = undefined;
    });

    it('noop', () => {
        expect(1).toEqual(1);
    });

    it('renders a <div>', () => {
        expect(
            dimLabel()
                .find('div')
                .first().length
        ).toEqual(1);
    });

    it('renders a <div> containing everything else', () => {
        const wrappingDiv = dimLabel()
            .find('div')
            .first();

        expect(wrappingDiv.children()).toEqual(dimLabel().children());
    });

    // it('renders a <RemoveDimensionButton /> when prop isSelected is equal to true', () => {
    //     props.isSelected = true;
    //     const removeButton = dimLabel().find(RemoveDimensionButton);

    //     expect(removeButton.length).toBe(1);
    // });

    // it('calls the prop function toggleDialog when the enter key or mouse click is fired on the component', () => {
    //     props.isSelected = true;
    //     dimLabel()
    //         .find(RemoveDimensionButton)
    //         .simulate('click');

    //     expect(1);
    // });
});

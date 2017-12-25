'use strict';

import React from 'react';
import PropTypes from 'prop-types'

import {
	View,
	ColorPropType,
	requireNativeComponent,
} from 'react-native';
import _ from 'lodash';


const defaultItemStyle = { color: 'white', fontSize: 26 };
const WheelCurvedPickerNativeInterface = {
	name: 'WheelCurvedPicker',
	propTypes: {
		...View.propTypes,
		data:PropTypes.array,
		textColor: ColorPropType,
		textSize: PropTypes.number,
		itemStyle: PropTypes.object,		
		itemSpace: PropTypes.number,
		onValueChange: PropTypes.func,		
		selectedValue: PropTypes.any,
		selectedIndex: PropTypes.number,
	}
}

const WheelCurvedPickerNative = requireNativeComponent('WheelCurvedPicker', WheelCurvedPickerNativeInterface);

class WheelCurvedPicker extends React.Component {
	static propTypes = {
		...View.propTypes,
		data:PropTypes.array,
		textColor: ColorPropType,
		textSize: PropTypes.number,
		itemStyle: PropTypes.object,		
		itemSpace: PropTypes.number,
		onValueChange: PropTypes.func,		
		selectedValue: PropTypes.any,
		selectedIndex: PropTypes.number,
	}

	static defaultProps = {
		itemSpace: 20
	}

	state = this._stateFromProps(this.props)

	constructor(props){
		super(props)
		this.state = this._stateFromProps(props)
	}

	componentWillReceiveProps (props) {
		this.setState(this._stateFromProps(props));
	}

	_stateFromProps(props) {
		let selectedIndex = 0;
		let items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

    let itemStyle = _.assign({}, defaultItemStyle, props.itemStyle);
		let textSize = itemStyle.fontSize
		let textColor =itemStyle.color

		return {selectedIndex, items, textSize, textColor};
	}

	_onValueChange(e) {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	}

	render() {
		return <WheelCurvedPickerNative
				{...this.props}
				onValueChange={(e)=>{
					this._onValueChange(e)
				} }
				data={this.state.items}
				textColor={this.state.textColor}
				textSize={this.state.textSize}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
}

class Item extends React.Component {
	static propTypes = {
		value: PropTypes.any, // string or integer basically
		label: PropTypes.string,
	}

	render() {
		// These items don't get rendered directly.
		return null
	}
}

WheelCurvedPicker.Item = Item;

export default WheelCurvedPicker

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

const SearchInput = (props) => {
	return (
		<View style={styles.container}>
			<SearchBar
			  round
			  //onChangeText={someMethod}
			  //onClear={someMethod}
			  clearIcon={{color: '#969696'}}
			  containerStyle={styles.searchContainer}
			  inputStyle={styles.input}
			  placeholderTextColor={'#969696'}
			  placeholder= {props.placeHolderText} />
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
	},
	searchContainer:{
	  backgroundColor: 'transparent',
	  borderTopWidth: 0,
	  borderBottomWidth: 0,
	  marginLeft: 15,
	  justifyContent: 'center'
	},
	input: {
		borderWidth: 1.5,
		borderColor: 'gray',
		backgroundColor: 'white',
		color: '#161616',
	}
}
export default SearchInput;

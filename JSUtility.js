class JSUtility {

	static setLocalStorage(p_key, p_value) {
		/**
		 * @method setLocalStorage
		 * This method will set item in local storage
		 */

		if (this.isEmpty(p_key) || this.isEmpty(p_value)) {
			return;
		}

		localStorage.setItem(p_key, p_value);
	}

	static getLocalStorage(p_key) {
		/**
		 * @method getLocalStorage
		 * This method will return the item from local storage
		 */

		if (this.isEmpty(p_key)) {

			return;
		}

		return localStorage.getItem(p_key);
	}

	static isSameArrays(p_arr1, p_arr2) {

		if (JSON.stringify(p_arr1) === JSON.stringify(p_arr2)) {
			return true;
		}
		return false;
	}

	static isEmailValid(p_strEmail, p_boolCanCheckEmpty = false) {

		if (this.isEmpty(p_strEmail)) {
			return !p_boolCanCheckEmpty;
		}
		const LArrEmail = String(p_strEmail).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		return Array.isArray(LArrEmail) && (LArrEmail.length > 0);
	}

	static findNodeInTree(p_objTree, p_strSearchBy, p_value, p_strChildreen = 'children') {
		/**
		 * @method findNodeInTree
		 * This method will find the node/record from js-tree
		 * 
		 * @param {Object} p_objTree It requires a tree where we need to search the element
		 * @param {String} p_strSearchBy Property name from tree object
		 * @param {Any} p_value Value of that property
		 * @param {String} p_strChildreen The children property of tree panel
		 * 
		 * @return {Object}: Searched record else null
		 */

		const LMe = this;

		//All parameters are required
		if (LMe.isObjEmpty(p_objTree) || LMe.isEmpty(p_strSearchBy) || LMe.isEmpty(p_value)) {
			return null;
		}//if..

		//Check for tree record, if its matches with value
		if (p_objTree[p_strSearchBy] === p_value) {
			//Here means, record found in tree
			return p_objTree;
		}//if..

		//Checking record in children
		const LChilds = p_objTree[p_strChildreen];

		//1st checking children is exists
		if (LMe.isEmpty(LChilds)) {
			//Here means, this node does not belongs in childrens
			return null;
		}//if..

		let LRecord = null;

		LChilds.every((p_objChildNode) => {
			LRecord = LMe.findNodeInTree(p_objChildNode, p_strSearchBy, p_value, p_strChildreen);

			if (LMe.isEmpty(LRecord) === false) {
				//Here means element found in array
				return false;//break;
			}//if..
			return true;//continue;
		});

		return LRecord;
	}

	static getPathArrIdsOfNode(p_objTree, p_intId, p_strChildreen = 'children', p_arrResult = []) {
		/**
		 * @method getPathArrIdsOfNode
		 * This method will return the path of node/record from js-tree
		 * 
		 * @param {Object} p_objTree It requires a tree where we need to search the element (usually the Root Node of the Tree)
		 * @param {Integer} p_intId Id of the record, Record Id for which you need to find path
		 * @param {String} p_strChildreen The children property of tree panel
		 * 
		 * @return {Array}: Ids (path) [SelfId, parentId, and so on... Root Node's Id]
		 */

		const LMe = this;

		//All parameters are required
		if (LMe.isObjEmpty(p_objTree) || LMe.isEmpty(p_intId)) return p_arrResult;

		p_intId = parseInt(p_intId);

		const LRecord = LMe.findNodeInTree(p_objTree, 'id', p_intId, p_strChildreen);

		if (LMe.isObjEmpty(LRecord)) return p_arrResult;

		//Here means record is presnt in tree, so adding Id
		p_arrResult.push(LRecord.id);

		if (LRecord.isRoot === true) {
			return p_arrResult;
		}//if..

		//Getting parent record
		return LMe.getPathArrIdsOfNode(p_objTree, LRecord.parentId, p_strChildreen, p_arrResult);
	}

	static each(array, fn, scope, reverse) {
		var i, ln;

		array = Array.from(array);

		ln = array.length;

		if (reverse !== true) {
			for (i = 0; i < ln; i++) {
				if (fn.call(scope || array[i], array[i], i, array) === false) {
					return i;
				}
			}
		}
		else {
			for (i = ln - 1; i > -1; i--) {
				if (fn.call(scope || array[i], array[i], i, array) === false) {
					return i;
				}
			}
		}

		return true;
	}

	static objectEach(object, fn, scope) {
		if (!object) {
			return;
		}

		var property;

		scope = scope || object;

		for (property in object) {
			if (object.hasOwnProperty(property)) {
				if (fn.call(scope, property, object[property], object) === false) {
					return;
				}
			}
		}
	}

	static randomString(p_intLength) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < p_intLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	static ConvertArrayToTree(p_arrList, p_intParentId) {
		p_arrList = p_arrList || [];

		var map = {}, node, roots = [], i;

		for (i = 0; i < p_arrList.length; i += 1) {
			map[p_arrList[i].id] = i; // initialize the map
			p_arrList[i].children = []; // initialize the children
		}

		for (i = 0; i < p_arrList.length; i += 1) {
			node = p_arrList[i];
			if (parseInt(node.parentId) !== p_intParentId) {
				//if you have dangling branches check that map[node.parentId] exists
				p_arrList[map[node.parentId]].children.push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
	}

	static arrayMerge(array1, array2) {

		return array1.concat(array2);
	}

	static removeElFromArrayByIndex(array, p_intIndex) {

		array.splice(p_intIndex, 1);

		return array;
	}

	static convertJSDateIntoSqlDate(p_jsDate) {
		const jsDate = new Date(p_jsDate); // create a new JavaScript Date object

		// create a formatted datetime string in the format "YYYY-MM-DD HH:MM:SS"
		const sqlDate = jsDate.getFullYear() + '-' +
			('0' + (jsDate.getMonth() + 1)).slice(-2) + '-' +
			('0' + jsDate.getDate()).slice(-2) + ' ' +
			('0' + jsDate.getHours()).slice(-2) + ':' +
			('0' + jsDate.getMinutes()).slice(-2) + ':' +
			('0' + jsDate.getSeconds()).slice(-2);

		return sqlDate; // output the SQL-compatible datetime string
	}

	static isEmpty(p_value, p_boolAllowEmptyString) {
		return (p_value == null) || (!p_boolAllowEmptyString ? p_value === '' : false) || (this.isArray(p_value) && p_value.length === 0);
	}

	static isObjEmpty(object) {
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	static isArray(value) {
		return toString.call(value) === '[object Array]';
	}

	static isDate(value) {
		return toString.call(value) === '[object Date]';
	}

	static isFunction(value) {
		return !!value && toString.call(value) === '[object Function]';
	}

	static cloneVar(item, cloneDom) {
		/**
		 * @param {Object} item The variable to clone
		 * @param {Boolean} [cloneDom=true] `true` to clone DOM nodes.
		 * @return {Object} clone
		 */

		if (item === null || item === undefined) {
			return item;
		}

		// DOM nodes
		// recursively
		if (cloneDom !== false && item.nodeType && item.cloneNode) {
			return item.cloneNode(true);
		}

		var type = toString.call(item),
			i, j, k, clone, key;

		// Date
		if (type === '[object Date]') {
			return new Date(item.getTime());
		}

		// Array
		if (type === '[object Array]') {
			i = item.length;

			clone = [];

			while (i--) {
				clone[i] = this.cloneVar(item[i], cloneDom);
			}
		}
		// Object
		else if (type === '[object Object]' && item.constructor === Object) {
			clone = {};

			for (key in item) {
				clone[key] = this.cloneVar(item[key], cloneDom);
			}
			var enumerables = ['valueOf', 'toLocaleString', 'toString', 'constructor']
			if (enumerables) {
				for (j = enumerables.length; j--;) {
					k = enumerables[j];
					if (item.hasOwnProperty(k)) {
						clone[k] = item[k];
					}
				}
			}
		}

		return clone || item;
	}
}

export default JSUtility;
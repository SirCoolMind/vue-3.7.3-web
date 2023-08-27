/**
 * Helpers Functions
 */
import moment from 'moment';
import get from 'get-value';
import numeral from "numeral";

/**
 * GetValue helper
 */
export function getValue(resource, key) {
  return get(resource, key);
}

/**
 * Date helper
 */
export function getTheDate(timestamp, format) {
	let time = timestamp * 1000;
	let formatDate = format ? format : 'MM-DD-YYYY';
	return moment(time).format(formatDate);
}

export function getDateFromISO(isoDate, format) {
  if (!isoDate) {
    return '';
  }

  let formatDate = format ? format : 'YYYY-MM-DD';
  return isoDate ? moment(isoDate).format(formatDate) : '';
}

export function getTimeFromISO(isoDate, format) {
  if (!isoDate) {
    return '';
  }

  let formatDate = format ? format : 'HH:mm';
  return isoDate ? moment(isoDate).format(formatDate) : '';
}

export function getDateTimeFromISO(isoDate, format) {
  if (!isoDate) {
    return '';
  }

  let formatDate = format ? format : 'YYYY-MM-DD h:mm A';
  return isoDate ? moment(isoDate).format(formatDate) : '';
}

export function getDateFromUnixTime(unixDate, format) {
  if (!unixDate) {
    return '';
  }

  let formatDate = format ? format : 'YYYY-MM-DD';
  return moment.unix(unixDate).format(formatDate);
}

export function convertDateToTimeStamp(date, format) {
	let formatDate = format ? format : 'YYYY-MM-DD';
	return moment(date, formatDate).unix();
}

export function convertDateToISO(date, format) {
  if (!date) {
    return '';
  }

  let formatDate = format ? format : 'YYYY-MM-DD';
  return moment(date, formatDate).format("YYYY-MM-DD[T]HH:mm:ssZ");
}

/**
 * Number helper
 */
export function formatNumber(value, format) {
  return numeral(value, format || '0,0.00');
}

export function removeFormatNumber(value) {
  return numeral(value).value();
}

/**
 * format address
 */
export function formatAddress(address) {
  let arr = [];
  arr.push(getValue(address, 'address1'));
  arr.push(getValue(address, 'address2'));
  arr.push(getValue(address, 'address3'));

  let postcodeCityState = [];
  postcodeCityState.push(getValue(address, 'postcode'));
  postcodeCityState.push(getValue(address, 'city'));
  postcodeCityState.push(getValue(address, 'state'));
  arr.push(postcodeCityState.filter(val => val).join(', '));

  return arr.filter(val => val).join('<br>');
}

/**
 * JSON helper
 */

export function parseJson(value, defaultValue) {
  let result = defaultValue;

  if (!value) {
    return result;
  }

  if ("object" == typeof value) {
    result = value;
  } else {
    try {
      result = JSON.parse(value);
    } catch(e) {
      result = defaultValue;
    }
  }
  return result;
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
}

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
	}
	throw new Error('Bad Hex');
}

/**
 * Function to return currenr app layout
 */
export function getCurrentAppLayout(router) {
	let location = router.history.current.fullPath;
	let path = location.split("/")
	return path[1];
}

export function getInnerScrollHeight(router) {
  let layout = getCurrentAppLayout(router);

  switch (layout) {
    case "default":
      return "height:calc(100vh - 220px)";
    case "mini":
      return "height:calc(100vh - 220px)";
    case "admin":
    case "horizontal":
      return "height:calc(100vh - 268px + 268px - 128px)";
    case "boxed":
      return "height:calc(100vh - 390px)";
    case "boxed-v2":
      return "height:calc(100vh - 390px)";
    default:
      return "height:calc(100vh - 220px)";
  }
}

export function getOuterScrollHeight(router) {
  let layout = getCurrentAppLayout(router);
  switch (layout) {
    case "default":
      return "height:calc(100vh - 220px)";
    case "mini":
      return "height:calc(100vh - 220px)";
    case "admin":
    case "horizontal":
      return "height:calc(100vh - 265px + 265px - 64px)";
    case "boxed":
      return "height:calc(100vh - 390px)";
    case "boxed-v2":
      return "height:calc(100vh - 390px)";
    default:
      return "height:calc(100vh - 220px)";
  }
}


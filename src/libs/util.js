export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

/**
 * 数据库列名转属性(下划线转驼峰)
 * @param columnName 数据库列名
 * @return
 */
function columnName2FieldName(columnName) {
    var result = ""
    var upcaseFlag = false

    if (!columnName || columnName == "") {
        return columnName
    }

    for (var i = 0; i < columnName.length; i++) {
        var ch = columnName[i]
        if (ch == '_') {
            upcaseFlag = true
            continue
        } else if (upcaseFlag) {
            result += ("" + ch).toUpperCase()
            upcaseFlag = false
        } else {
            result += ch
            upcaseFlag = false
        }
    }
    return result
}
/**
 * 属性转数据库列名(驼峰传下划线)
 * @param str 属性名
 * @return
 */
function fieldName2ColumnName(columnName) {
    var result = ""
    var upcaseFlag = false

    if (!columnName || columnName == "") {
        return columnName
    }

    for (var i = 0; i < columnName.length; i++) {
        var ch = columnName[i]
        if (ch > 'A' && ch < 'Z') {
            result += ("_" + ch).toLowerCase()
        } else {
            result += ch
        }
    }
    return result
}

export const convertObj = (from, to, isToUnderscore) => {
    let newObj = {}
    
    for (var key in from) {
        let fieldName = columnName2FieldName(key)

        if (isToUnderscore) {
            fieldName = fieldName2ColumnName(key)
        }

        let val = from[key] != undefined ? from[key] : ""
        newObj[fieldName] = val
        // eval("newObj."+fieldName+"='"+val+"'")
    }

    Object.assign(to, newObj)
}


if (typeof dwr == 'undefined' || dwr.engine == undefined) throw new Error('You must include DWR engine before including this file');

(function() {
  if (dwr.engine._getObject("M3") == undefined) {
    var p;

    p = {};
    p._path = '/dwr';

    /**
     * @param {class java.lang.String} p0 a param
     * @param {class java.lang.String} p1 a param
     * @param {function|Object} callback callback function or options object
     */
    p.login = function(p0, p1, callback) {
      return dwr.engine._execute(p._path, 'M3', 'login', arguments);
    };

    /**
     * @param {function|Object} callback callback function or options object
     */
    p.logout = function(callback) {
      return dwr.engine._execute(p._path, 'M3', 'logout', arguments);
    };

    /**
     * @param {class java.lang.String} p0 a param
     * @param {function|Object} callback callback function or options object
     */
    p.ping = function(p0, callback) {
      return dwr.engine._execute(p._path, 'M3', 'ping', arguments);
    };

    /**
     * @param {long} p0 a param
     * @param {function|Object} callback callback function or options object
     */
    p.triggerAssetExport = function(p0, callback) {
      return dwr.engine._execute(p._path, 'M3', 'triggerAssetExport', arguments);
    };

    /**
     * @param {class java.lang.String} p0 a param
     * @param {function|Object} callback callback function or options object
     */
    p.resetPasswordRequest = function(p0, callback) {
      return dwr.engine._execute(p._path, 'M3', 'resetPasswordRequest', arguments);
    };

    /**
     * @param {function|Object} callback callback function or options object
     */
    p.getFileUploadInfo = function(callback) {
      return dwr.engine._execute(p._path, 'M3', 'getFileUploadInfo', arguments);
    };

    /**
     * @param {function|Object} callback callback function or options object
     */
    p.getSelectableValueDependencies = function(callback) {
      return dwr.engine._execute(p._path, 'M3', 'getSelectableValueDependencies', arguments);
    };

    /**
     * @param {class java.lang.Long} p0 a param
     * @param {class java.lang.Long} p1 a param
     * @param {function|Object} callback callback function or options object
     */
    p.getSelectableValuesFor = function(p0, p1, callback) {
      return dwr.engine._execute(p._path, 'M3', 'getSelectableValuesFor', arguments);
    };

    /**
     * @param {class java.lang.String} p0 a param
     * @param {function|Object} callback callback function or options object
     */
    p.setGuiLanguage = function(p0, callback) {
      return dwr.engine._execute(p._path, 'M3', 'setGuiLanguage', arguments);
    };

    /**
     * @param {function|Object} callback callback function or options object
     */
    p.abortFileUpload = function(callback) {
      return dwr.engine._execute(p._path, 'M3', 'abortFileUpload', arguments);
    };

    dwr.engine._setObject("M3", p);
  }
})();

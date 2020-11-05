/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */

define(['ojs/ojcore', 'jquery'], function(oj, $)
{
  "use strict";


/**
 * Constructs a message object.
 * <p><strong>NOTE:</strong>  Instead of using the constructor, please use an Object
 * that duck-types oj.Message - has summary, detail, and severity properties.
 * Creating an oj.Message Object provides no additional value than
 * the duck-typed Object.
 * </p>
 * @param {string} summary - Localized summary message text
 * @param {string} detail - Localized detail message text
 * @param {(number|string)=} severity - An optional severity for this message. Use constants
 * oj.Message.SEVERITY_LEVEL for number types and oj.Message.SEVERITY_TYPE for string types. Default
 * is SEVERITY_ERROR if no severity is specified
 * @constructor
 * @final
 * @ojtsmodule
 * @export
 * @since 0.6.0
 * @example <caption>Set application messages using the
 * <code class="prettyprint">messages-custom</code> attribute. This example creates messages
 * the recommended way, by creating an Object that duck-types oj.Message.</caption>
 * --- HTML ---
 * &lt;oj-input-text messages-custom="{{appMessages}}");>&lt;/oj-input-text>
 *
 * --- Javascript ---
 * // for messagesCustom property
 * self.appMessages = ko.observable();
 * var msgs = [];
 * msgs.push({summary: "Error Summary", detail: "Error Detail",
 *  severity: oj.Message.SEVERITY_TYPE['CONFIRMATION']});
 * self.appMessages(msgs);
 * @ojsignature [{target: "Type",
 *                value: "oj.Message.SEVERITY_TYPE| oj.Message.SEVERITY_LEVEL",
 *                for: "severity"}]
 */
oj.Message = function (summary, detail, severity) {
  this.Init(summary, detail, severity);
};
/**
 * Indicates the type of severity that the message represents.
 * @enum {string}
 * @export
 */


oj.Message.SEVERITY_TYPE = {
  /**
   * Indicates a confirmation that an operation or task was completed. This is the lowest severity
   * level.
   */
  CONFIRMATION: 'confirmation',

  /**
   * Indicates information or operation messages. This has a lower severity level than warning.
   */
  INFO: 'info',

  /**
   * Indicates an application condition or situation that might require users' attention. This has a
   * lower severity than error.
   */
  WARNING: 'warning',

  /**
   * Used when data inaccuracies occur when completing a field and that needs fixing before user can
   * continue. This has a lower severity level than fatal.
   * fatal.
   */
  ERROR: 'error',

  /**
   * Used when a critical application error or an unknown failure occurs. This is the highest
   * severity level.
   * @const
   * @export
   */
  FATAL: 'fatal'
};
/**
 * Message severity level
 * @enum {number}
 * @export
 */

oj.Message.SEVERITY_LEVEL = {
  FATAL: 5,
  ERROR: 4,
  WARNING: 3,
  INFO: 2,
  CONFIRMATION: 1
}; // Subclass from oj.Object

oj.Object.createSubclass(oj.Message, oj.Object, 'oj.Message');
/**
 * Localized summary text.
 *
 * @member
 * @name summary
 * @memberof oj.Message
 * @instance
 * @type {string}
 * @default ""
 */

/**
 * Localized detail text.
 *
 * @member
 * @name detail
 * @memberof oj.Message
 * @instance
 * @type {string}
 * @default ""
 */

/**
 * Severity type of message. See oj.Message.SEVERITY_TYPE for string types and oj.Message.SEVERITY_LEVEL for number types.
 *
 * @member
 * @name severity
 * @memberof oj.Message
 * @instance
 * @type {string|number}
 * @ojsignature [{target: "Type",
 *                value: "oj.Message.SEVERITY_TYPE| oj.Message.SEVERITY_LEVEL"}]
 * @default oj.Message.SEVERITY_TYPE.ERROR
 */

/**
 * Initializes Message instance with the set options
 * @param {string} summary a localized summary message text
 * @param {string} detail a localized detail message text
 * @param {number|string=} severity - An optional severity for this message.  Use constants
 * oj.Message.SEVERITY_LEVEL for number types and oj.Message.SEVERITY_TYPE for string types.
 *
 * @export
 * @ignore
 */

oj.Message.prototype.Init = function (summary, detail, severity) {
  oj.Message.superclass.Init.call(this);
  this.summary = summary;
  this.detail = detail;
  this.severity = severity || oj.Message.SEVERITY_TYPE.ERROR; // defaults to ERROR
};
/**
 * A convenience method that returns the severity level when given either a severity level of type
 * number or a severity type of string.
 * If severity level is not provided or is not valid this returns a severity error.
 * @param {(string|number)=} severity
 * @return {number}
 * @memberof oj.Message
 * @ojsignature [{target: "Type",
 *                value: "oj.Message.SEVERITY_LEVEL",
 *                for: "returns"},
 *               {target: "Type",
 *                value: "oj.Message.SEVERITY_TYPE|oj.Message.SEVERITY_LEVEL",
 *                for: "severity"}]
 * @public
 * @export
 */


oj.Message.getSeverityLevel = function (severity) {
  var _severity = severity;

  if (_severity) {
    if (typeof severity === 'string') {
      var index = oj.Message._LEVEL_TO_TYPE.indexOf(_severity, 1);

      if (index === -1) {
        _severity = oj.Message.SEVERITY_LEVEL.ERROR;
      } else {
        _severity = index;
      }
    } else if (typeof _severity === 'number' && (_severity < oj.Message.SEVERITY_LEVEL.CONFIRMATION || _severity > oj.Message.SEVERITY_LEVEL.FATAL)) {
      _severity = oj.Message.SEVERITY_LEVEL.ERROR;
    }
  }

  return _severity || oj.Message.SEVERITY_LEVEL.ERROR;
};
/**
 * A convenience method that returns the severity type when given either a severity level of type
 * number or a severity type of string.
 * If severity level is not provided or is not valid this return a severity error.
 * @param {(string|number)=} level
 * @return {string}
 * @ojsignature [{target: "Type",
 *                value: "oj.Message.SEVERITY_TYPE",
 *                for: "returns"},
 *               {target: "Type",
 *                value: "oj.Message.SEVERITY_TYPE|oj.Message.SEVERITY_LEVEL",
 *                for: "level"}]
 * @memberof oj.Message
 * @public
 * @export
 */


oj.Message.getSeverityType = function (level) {
  var _level = level;

  if (_level) {
    if (typeof _level === 'string') {
      var index = oj.Message._LEVEL_TO_TYPE.indexOf(_level, 1);

      if (index === -1) {
        // when given an unrecognized type return "error"
        _level = oj.Message.SEVERITY_TYPE.ERROR;
      }
    } else if (typeof _level === 'number') {
      if (_level < oj.Message.SEVERITY_LEVEL.CONFIRMATION || _level > oj.Message.SEVERITY_LEVEL.FATAL) {
        _level = oj.Message.SEVERITY_TYPE.ERROR;
      } else {
        _level = oj.Message._LEVEL_TO_TYPE[level];
      }
    }
  }

  return _level || oj.Message.SEVERITY_TYPE.ERROR;
};
/**
 * Returns the max severity level in a array of message objects.
 *
 * @param {Array.<oj.Message>=} messages an array of message instances or duck typed messages
 * @returns {number} -1 if none can be determined; otherwise a severity level as defined by
 * oj.Message.SEVERITY_LEVEL.
 * @export
 * @memberof oj.Message
 * @ojsignature [{target: "Type",
 *                value: "oj.Message.SEVERITY_LEVEL| -1",
 *                for: "returns"}]
 * @public
 */


oj.Message.getMaxSeverity = function (messages) {
  var maxLevel = -1;

  if (messages && messages.length > 0) {
    $.each(messages, function (i, message) {
      var currLevel = oj.Message.getSeverityLevel(message.severity);
      maxLevel = maxLevel < currLevel ? currLevel : maxLevel;
    });
  }

  return maxLevel;
};
/**
 * Returns false if messages are of severity error or greater.
 *
 * @param {Array.<oj.Message>} messages an array of message instances or duck-typed messages
 * @returns {boolean} true if none of the messages are of severity error or greater. false otherwise
 * @export
 * @memberof oj.Message
 * @public
 */


oj.Message.isValid = function (messages) {
  var maxSeverity = oj.Message.getMaxSeverity(messages);

  if (maxSeverity >= oj.Message.SEVERITY_LEVEL.ERROR) {
    return false;
  }

  return true;
};
/**
 * @private
 * @type Array
 */


oj.Message._LEVEL_TO_TYPE = ['none', // this can never be set
oj.Message.SEVERITY_TYPE.CONFIRMATION, oj.Message.SEVERITY_TYPE.INFO, oj.Message.SEVERITY_TYPE.WARNING, oj.Message.SEVERITY_TYPE.ERROR, oj.Message.SEVERITY_TYPE.FATAL]; // mapping a variable to the name used in the require callback function for this module
// it is used in a no-require environment
// eslint-disable-next-line no-unused-vars

var Message = oj.Message;



/**
 * Extends oj.Message to represent a component specific message, this defines options that control
 * how the message will display.
 *
 * @param {string} summary - Localized summary message text
 * @param {string} detail - Localized detail message text
 * @param {number|string} severity - An optional severity for this message. Use constants
 * oj.Message.SEVERITY_LEVEL for number types and oj.Message.SEVERITY_TYPE for string types. Default
 * is SEVERITY_ERROR if no severity is specified
 * @param {Object} options - an Object literal that defines the following properties
 * @property {string} display - whether the message needs to be displayed immediately or not.
 * Accepted values are 'immediate', 'deferred'. The default is 'immediate'.
 * @property {string} context - the context the component was in when the validation messages was
 * added.<p>
 *
 * NOTE: messages added to the component directly by applications are unknown context and always
 * shown {display: 'immediate', context: ''}. </p>
 * @private
 * @constructor
 * @since 0.7.0
 */
oj.ComponentMessage = function (summary, detail, severity, options) {
  this.Init(summary, detail, severity, options);
}; // Subclass from oj.Message


oj.Object.createSubclass(oj.ComponentMessage, oj.Message, 'oj.ComponentMessage');
/**
 * Determines whether the message is displayed immediately or not. Deferred messages are not shown
 * to the user right away but are deferred until component explicitly does. See
 * {@link oj.editableValue#showMessages}.
 * @private
 * @const
 * @type {Object}
 */

oj.ComponentMessage.DISPLAY = {
  SHOWN: 'shown',
  HIDDEN: 'hidden'
};
/**
 * The default display options to use when none set.
 *
 * @type {Object}
 * @private
 */

oj.ComponentMessage._DEFAULT_OPTIONS = {
  display: oj.ComponentMessage.DISPLAY.SHOWN,
  context: ''
};
/**
 * Initializes the strategy based on the display options that specify the messaging artifacts that
 * will be displayed by this strategy.
 *
 * @param {string} summary - Localized summary message text
 * @param {string} detail - Localized detail message text
 * @param {number|string} severity - An optional severity for this message. Use constants
 * oj.Message.SEVERITY_LEVEL for number types and oj.Message.SEVERITY_TYPE for string types. Default
 * is SEVERITY_ERROR if no severity is specified
 * @param {Object} options - an Object literal that defines the following properties
 * @memberof! oj.ComponentMessage
 * @instance
 * @protected
 * @ignore
 */

oj.ComponentMessage.prototype.Init = function (summary, detail, severity, options) {
  oj.ComponentMessage.superclass.Init.call(this, summary, detail, severity);
  this._options = $.extend({}, oj.ComponentMessage._DEFAULT_OPTIONS, options);
};
/**
 * Clones this and returns the new instance.
 *
 * @memberof! oj.ComponentMessage
 * @instance
 * @protected
 * @ignore
 * @returns {Object}
 */


oj.ComponentMessage.prototype.clone = function () {
  return new oj.ComponentMessage(this.summary, this.detail, this.severity, this._options);
};
/**
 * Whether a message can display on the UI.
 *
 * @memberof! oj.ComponentMessage
 * @returns {boolean} true if messages can be displayed; false if marked as deferred by component.
 * @instance
 * @protected
 * @ignore
 */


oj.ComponentMessage.prototype.canDisplay = function () {
  return !(this._options && this._options.display ? this._options.display === oj.ComponentMessage.DISPLAY.HIDDEN : false);
};
/**
 *
 * Called by framework when the message needs to be shown
 *
 * @returns {boolean} true if shown; false if message display was already shown
 *
 * @memberof! oj.ComponentMessage
 * @instance
 * @private
 */


oj.ComponentMessage.prototype._forceDisplayToShown = function () {
  if (this._options && oj.ComponentMessage.DISPLAY.HIDDEN === this._options.display) {
    this._options.display = oj.ComponentMessage.DISPLAY.SHOWN;
    return true;
  }

  return false;
};
/**
 * Called by framework to determine if message was added by component versus app.
 *
 * @returns {boolean} true if messages was added by component. Usually the context is set.
 *
 * @memberof! oj.ComponentMessage
 * @instance
 * @private
 */


oj.ComponentMessage.prototype._isMessageAddedByComponent = function () {
  if (this._options && this._options.context) {
    return true;
  }

  return false;
};

  return oj.Message;
});
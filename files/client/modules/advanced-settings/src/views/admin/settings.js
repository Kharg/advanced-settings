define('advanced-settings:views/admin/settings', ['views/settings/record/edit'], function (Dep) {

    return Dep.extend({

        gridLayoutType: 'record',

        events: {
            'click button[data-action="save"]': function () {
                this.actionSave();
                this.broadcastUpdate();
            },
            'click button[data-action="cancel"]': function () {
                this.cancel();
            },
            'click button[data-action="resetToDefault"]': function () {
                this.confirm(this.translate('confirmation', 'messages'), () => {
                    this.resetToDefault();
                    this.broadcastUpdate();
                });
            },
        },

        buttonList: [
            {
                name: 'save',
                label: 'Save',
                style: 'primary',
                title: 'Ctrl+Enter',
            },
            {
                name: 'cancel',
                label: 'Cancel',
            },
            {
                name: 'resetToDefault',
                label: 'Restore',
            }
        ],

        detailLayout: [
            {
                "rows": [
                    [{"name": "listPagination"}, {"name": "adminPanelIframeDisabled"}],
                    [{"name": "globalSearchMaxSize"}, {"name": "activitiesCreateButtonMaxCount"}],
                    [{"name": "applicationDescription"}],
                ],
                "style": "default",
                "label": "User Interface"
            },
            {
                "rows": [
                    [{"name": "massActionIdleCountThreshold"}, {"name": "exportIdleCountThreshold"}],
                    [{"name": "massEmailMaxAttemptCount"}, {"name": "massEmailSiteUrl"}],
                ],
                "style": "default",
                "label": "Mass Actions"
            },
            {
                "rows": [
                    [{"name": "recordListMaxSizeLimit"}, {"name": "maxSelectTextAttributeLengthForList"}],
                ],
                "style": "default",
                "label": "API"
            },
            {
                "rows": [
                    [{"name": "emailReminderPortionSize"}, {"name": "notificationsMaxSize"}],
                    [{"name": "notificationsCheckInterval"}, {"name": "popupNotificationsCheckInterval"}],
                    [{"name": "notificationSoundsDisabled"}],
                ],
                "style": "default",
                "label": "Notifications"
            },
            {
                "rows": [
                    [{"name": "streamEmailWithContentEntityTypeList"}, {"name": "recordFollowersLoadLimit"}],
                ],
                "style": "default",
                "label": "Stream"
            },
            {
                "rows": [
                    [{"name": "emailKeepParentTeamsEntityList"}, {"name": "emailAutoReplyLimit"}],
                    [{"name": "emailFoldersDisabled"}, {"name": "emailRecipientAddressMaxCount"}],
                    [{"name": "emailTemplateHtmlizerDisabled"}],
                ],
                "style": "default",
                "label": "Emails"
            },
            {
                "rows": [
                    [{"name": "authMaxFailedAttemptNumber"}/*, {"name": "authAnotherUserDisabled"}*/],
                    //[{"name": "authLogDisabled"}, {"name": "authApiUserLogDisabled"}],
                ],
                "style": "default",
                "label": "Authentication"
            },
            {
                "rows": [
                    [{"name": "eventAssignedUserIsAttendeeDisabled"}, {"name": "eventInvitationForceSystemSmtp"}],
                ],
                "style": "default",
                "label": "Events"
            },
            {
                "rows": [
                    [{"name": "kanbanMaxOrderNumber"}, {"name": "kanbanMinColumnWidth"}],
                ],
                "style": "default",
                "label": "Kanban"
            },
            {
                "rows": [
                    [{"name": "inlineAttachmentUploadMaxSize"}],
                ],
                "style": "default",
                "label": "Attachments"
            },
            {
                "rows": [
                    [{"name": "cleanupOrphanAttachments"}, {"name": "cleanupSubscribers"}],
                ],
                "style": "default",
                "label": "Clean-up"
            },
            {
                "rows": [
                    [{"name": "thumbImageCacheDisabled"}, {"name": "textFilterContainsMinLength"}],
                    [{"name": "ajaxTimeout"}],
                ],
                "style": "default",
                "label": "Misc"
            }
        ],

        setup: function () {
            Dep.prototype.setup.call(this);
        },

        afterSave: function () {
            Dep.prototype.afterSave.call(this);
            window.location.reload();
            },

        resetToDefault: function () {
            Espo.Ajax
            .putRequest('Settings/1', {
                listPagination: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'listPagination', 'default']),
                notificationSoundsDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'notificationSoundsDisabled', 'default']),
                adminPanelIframeDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'adminPanelIframeDisabled', 'default']),
                activitiesCreateButtonMaxCount: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'activitiesCreateButtonMaxCount', 'default']),
                thumbImageCacheDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'thumbImageCacheDisabled', 'default']),
                recordListMaxSizeLimit: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'recordListMaxSizeLimit', 'default']),
                globalSearchMaxSize: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'globalSearchMaxSize', 'default']),
                maxSelectTextAttributeLengthForList: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'maxSelectTextAttributeLengthForList', 'default']),
                massActionIdleCountThreshold: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'massActionIdleCountThreshold', 'default']),
                exportIdleCountThreshold: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'exportIdleCountThreshold', 'default']),
                streamEmailWithContentEntityTypeList: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'streamEmailWithContentEntityTypeList', 'default']),
                recordFollowersLoadLimit: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'recordFollowersLoadLimit', 'default']),
                authMaxFailedAttemptNumber: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'authMaxFailedAttemptNumber', 'default']),
                eventAssignedUserIsAttendeeDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'eventAssignedUserIsAttendeeDisabled', 'default']),
                eventInvitationForceSystemSmtp: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'eventInvitationForceSystemSmtp', 'default']),
                inlineAttachmentUploadMaxSize: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'inlineAttachmentUploadMaxSize', 'default']),
                textFilterContainsMinLength: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'textFilterContainsMinLength', 'default']),
                kanbanMaxOrderNumber: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'kanbanMaxOrderNumber', 'default']),
                kanbanMinColumnWidth: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'kanbanMinColumnWidth', 'default']),
                massEmailMaxAttemptCount: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'massEmailMaxAttemptCount', 'default']),
                massEmailSiteUrl: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'massEmailSiteUrl', 'default']),
                cleanupOrphanAttachments: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'cleanupOrphanAttachments', 'default']),
                cleanupSubscribers: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'cleanupSubscribers', 'default']),
                emailKeepParentTeamsEntityList: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailKeepParentTeamsEntityList', 'default']),
                emailAutoReplyLimit: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailAutoReplyLimit', 'default']),
                emailFoldersDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailFoldersDisabled', 'default']),
                emailRecipientAddressMaxCount: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailRecipientAddressMaxCount', 'default']),
                emailTemplateHtmlizerDisabled: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'emailTemplateHtmlizerDisabled', 'default']),
                ajaxTimeout: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'ajaxTimeout', 'default']),
                applicationDescription: this.getMetadata().get(['entityDefs', this.scope, 'fields', 'applicationDescription', 'default']),
            })
            .then(response => {
                this.model.fetch();
                window.location.reload();
            });
        },

        broadcastUpdate: function () {
            this.getHelper().broadcastChannel.postMessage('reload');
        },

    });
});

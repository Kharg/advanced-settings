<?php

class AfterInstall
{
    protected $container;

    public function run($container)
    {
        $this->container = $container;

        $this->clearCache();
        $this->setDefaultValues();
        $entityManager = $container->get('entityManager');
    }

    protected function clearCache()
    {
        try {
            $this->container->get('dataManager')->clearCache();
        } catch (\Exception $e) {}
    }

    protected function setDefaultValues()
    {
        $config = $this->container->get('config');
        $settings = [
            'notificationSoundsDisabled' => true,
            'activitiesCreateButtonMaxCount' => 3,
            'recordListMaxSizeLimit' => 200,
            'globalSearchMaxSize' => 10,
            'maxSelectTextAttributeLengthForList' => 10000,
            'massActionIdleCountThreshold' => 100,
            'exportIdleCountThreshold' => 1000,
            'emailReminderPortionSize' => 10,
            'notificationsMaxSize' => 5,
            'notificationsCheckInterval' => 10,
            'popupNotificationsCheckInterval' => 15,
            'streamEmailWithContentEntityTypeList' => ['Case'],
            'emailKeepParentTeamsEntityList' => ['Case'],
            'recordFollowersLoadLimit' => 6,
            'authMaxFailedAttemptNumber' => 10,
            'inlineAttachmentUploadMaxSize' => 20,
            'kanbanMaxOrderNumber' => 50,
            'kanbanMinColumnWidth' => 220,
            'massEmailMaxAttemptCount' => 3,
            'textFilterContainsMinLength' => 4,
            'cleanupSubscribers' => true,
            'emailRecipientAddressMaxCount' => 100,
            'ajaxTimeout' => 60000,
            'applicationDescription' => 'EspoCRM - Open Source CRM application.'
        ];
    
        foreach ($settings as $key => $default) {
            $value = $config->get($key);
            if ($value === null) {
                $config->set($key, $default);
            } else {
                $config->set($key, $value);
            }
        }
    
        $config->save();
    }
}

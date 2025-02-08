package com.storyapp.salesforceChat

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.salesforce.android.smi.core.CoreConfiguration
import com.salesforce.android.smi.ui.UIClient
import com.salesforce.android.smi.ui.UIConfiguration
import java.util.UUID

class SalesforceMessagingModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // Retorna o nome do módulo, que será usado no JavaScript
    override fun getName(): String = "SalesforceMessaging"

    /**
     * Método exposto ao JavaScript para inicializar o SDK.
     * Ele lê o arquivo de configuração, cria uma conversa e abre a Activity correspondente.
     */
    @ReactMethod
    fun initializeSalesforceMessaging(promise: Promise) {
        // Obtém a Activity atual; certifique-se de que ela não seja nula
        val activity = currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "Activity atual não encontrada")
            return
        }

        try {
            // Certifique-se de que o arquivo configFile.json esteja disponível (por exemplo, na pasta assets)
            val coreConfig = CoreConfiguration.fromFile(activity, "configFile.json")
            val conversationID = UUID.randomUUID()

            // Cria a configuração de UI
            val config = UIConfiguration(coreConfig, conversationID)
            val uiClient = UIClient.Factory.create(config)
            uiClient.openConversationActivity(activity)

            promise.resolve("Salesforce Messaging inicializado com sucesso")
        } catch (e: Exception) {
            e.printStackTrace()
            promise.reject("INIT_ERROR", e)
        }
    }
}
package com.github.domwood.kiwi.kafka.provision;

import com.github.domwood.kiwi.kafka.configs.KafkaConfigManager;
import com.github.domwood.kiwi.kafka.resources.*;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.BytesDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Properties;

@Component
public class KafkaResourceProvider {

    private final KafkaConfigManager configManager;

    public KafkaResourceProvider(KafkaConfigManager configManager) {
        this.configManager = configManager;
    }

    public KafkaConsumerResource<String, byte[]> kafkaByteConsumerResource(Optional<String> clusterName) {
        Properties props = configManager.generateConsumerConfig(clusterName);
        props.setProperty(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, BytesDeserializer.class.getName());
        return new KafkaConsumerResource<>(props);
    }

    public KafkaConsumerResource<String, String> kafkaStringConsumerResource(Optional<String> clusterName) {
        return new KafkaConsumerResource<>(configManager.generateConsumerConfig(clusterName));
    }

    public KafkaProducerResource<String, String> kafkaStringProducerResource(Optional<String> clusterName) {
        return new KafkaProducerResource<>(configManager.generateProducerConfig(clusterName));
    }

    public KafkaAdminResource kafkaAdminResource(Optional<String> clusterName) {
        return new KafkaAdminResource(configManager.generateAdminConfig(clusterName));
    }

    public KafkaTopicConfigResource kafkaTopicConfigResource() {
        return new KafkaTopicConfigResource(null);
    }

    public KafkaResourcePair<KafkaAdminResource, KafkaConsumerResource<String, String>> kafkaAdminAndConsumer(Optional<String> clusterName) {
        KafkaAdminResource admin = this.kafkaAdminResource(clusterName);
        KafkaConsumerResource<String, String> consumer = kafkaStringConsumerResource(clusterName);
        return new KafkaResourcePair<>(admin, consumer);
    }

}

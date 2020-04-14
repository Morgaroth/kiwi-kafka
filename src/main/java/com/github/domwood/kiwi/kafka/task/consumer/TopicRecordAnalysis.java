package com.github.domwood.kiwi.kafka.task.consumer;

import com.github.domwood.kiwi.data.input.TopicRecordAnalysisRequest;
import com.github.domwood.kiwi.data.output.TopicRecordAnalysisResponse;
import com.github.domwood.kiwi.kafka.resources.KafkaConsumerResource;
import com.github.domwood.kiwi.kafka.task.ContinousFuturisingKafkaTask;
import org.apache.kafka.clients.consumer.ConsumerRecords;

import java.time.Duration;

import static java.time.temporal.ChronoUnit.MILLIS;
import static java.util.concurrent.TimeUnit.MILLISECONDS;

public class TopicRecordAnalysis extends ContinousFuturisingKafkaTask<TopicRecordAnalysisRequest, TopicRecordAnalysisResponse, KafkaConsumerResource<String, byte[]>> {

    public TopicRecordAnalysis(KafkaConsumerResource<String, byte[]> resource,
                               TopicRecordAnalysisRequest input) {
        super(resource, input);
    }

    @Override
    protected Void delegateExecuteSync() {
        int idleCount = 0;
        try {

            while (!this.isClosed()) {
                if (this.isPaused()) {
                    MILLISECONDS.sleep(20);
                } else {
                    ConsumerRecords<String, byte[]> records = resource.poll(Duration.of(Integer.max(10 ^ (idleCount + 1), 5000), MILLIS));
                    if (records.isEmpty()) {
                        idleCount++;
                        logger.debug("No records polled for topic {} ", input.topic());

                    } else {
                        idleCount = 0;
                    }
                }
            }
        } catch (Exception e) {
            logger.error("Error occurred during topic analysis", e);
        }
        return null;
    }

    @Override
    public void update(TopicRecordAnalysisRequest input) {
        //Do Nothing
    }

}

package com.github.domwood.kiwi.data.input;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;


@JsonSerialize(as = ImmutableTopicRecordAnalysisRequest.class)
@JsonDeserialize(as = ImmutableTopicRecordAnalysisRequest.class)
@Value.Immutable
@Value.Style(depluralize = true)
public interface TopicRecordAnalysisRequest extends InboundRequest {
    String topic();
}

package com.github.domwood.kiwi.data.output;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.Map;

@Value.Immutable
@JsonSerialize(as = ImmutableTopicRecordAnalysisResponse.class)
@JsonDeserialize(as = ImmutableTopicRecordAnalysisResponse.class)
public interface TopicRecordAnalysisResponse extends OutboundResponse{
    Map<Integer, RecordAnalysis> partitions();
    RecordAnalysis total();
    Boolean finished();
    Boolean inError();
}

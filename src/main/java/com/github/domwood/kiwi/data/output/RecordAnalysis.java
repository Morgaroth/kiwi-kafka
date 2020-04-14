package com.github.domwood.kiwi.data.output;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

@Value.Immutable
@JsonSerialize(as = ImmutableRecordAnalysis.class)
@JsonDeserialize(as = ImmutableRecordAnalysis.class)
public interface RecordAnalysis {
    Integer totalRecords();
}

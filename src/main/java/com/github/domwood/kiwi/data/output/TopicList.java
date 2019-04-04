package com.github.domwood.kiwi.data.output;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.List;

@JsonSerialize(as = ImmutableTopicList.class)
@Value.Immutable
@Value.Style(depluralize = true)
public interface TopicList {
    List<String> topics();
}

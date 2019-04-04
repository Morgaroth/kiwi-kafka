package com.github.domwood.kiwi.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.domwood.kiwi.data.output.ImmutableTopicList;
import com.github.domwood.kiwi.data.output.TopicList;
import com.github.domwood.kiwi.kafka.provision.KafkaResourceProvider;
import com.github.domwood.kiwi.kafka.provision.KafkaTaskProvider;
import com.github.domwood.kiwi.kafka.resources.KafkaAdminResource;
import com.github.domwood.kiwi.kafka.task.admin.ListTopics;
import org.json.JSONException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.concurrent.CompletableFuture;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.skyscreamer.jsonassert.JSONCompareMode.NON_EXTENSIBLE;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AdminControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private KafkaResourceProvider kafkaResourceProvider;

    @MockBean
    private KafkaTaskProvider kafkaTaskProvider;

    @Autowired
    private AdminController controller;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private ListTopics listTopics;

    @Test
    public void contexLoads() {
        assertThat(controller).isNotNull();
    }

    @Before
    public void beforeEach(){
        when(kafkaTaskProvider.listTopics()).thenReturn(listTopics);
    }

    @Test
    public void testTopicList() throws JsonProcessingException, JSONException {
        TopicList expected = expected("Hello World", "Banana");
        when(listTopics.execute(any(), any())).thenReturn(CompletableFuture.completedFuture(expected));

        String observed = this.restTemplate.getForObject("http://localhost:" + port + "/api/listTopics", String.class);

        JSONAssert.assertEquals(observed, objectMapper.writeValueAsString(expected), NON_EXTENSIBLE);

        verify(listTopics, times(1)).execute(any(), any());
    }

    private TopicList expected(String... topics){
        return ImmutableTopicList.builder()
                .addTopics(topics)
                .build();
    }

}

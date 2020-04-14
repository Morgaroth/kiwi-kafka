package com.github.domwood.kiwi.kafka.task;

import com.github.domwood.kiwi.kafka.resources.AbstractKafkaResource;
import com.github.domwood.kiwi.utilities.FutureUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;

/**
 * Provides an interface for the task to return a O return type.
 * This class then wraps the return into a CompletableFuture<O>
 * to provide the parent class's return type.
 *
 * @param <I> input type
 * @param <O> output type
 * @param <R> kafka resource type used by the class
 **/
public abstract class FuturisingKafkaTask<I, O, R extends AbstractKafkaResource> extends AbstractKafkaTask<I, O, R> {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass());

    public FuturisingKafkaTask(R resource, I input) {
        super(resource, input);
    }

    @Override
    protected CompletableFuture<O> delegateExecute() {
        return FutureUtils.supplyAsync(this::delegateExecuteSync);
    }

    protected abstract O delegateExecuteSync();

}

package com.github.domwood.kiwi.kafka.task;

import com.github.domwood.kiwi.kafka.resources.AbstractKafkaResource;
import com.github.domwood.kiwi.utilities.FutureUtils;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;


/**
 * Provides an interface for the task to forward O type to a consumer continuously
 * This class then wraps the returns a CompletableFuture<Void> which completes
 * only when the continuous task is finished sending all its messages or is closed externally
 *
 * @param <I> input type
 * @param <O> output type
 * @param <R> kafka resource type used by the class
 */
public abstract class ContinousFuturisingKafkaTask<I, O, R extends AbstractKafkaResource> extends FuturisingKafkaTask<I, Void, R> implements KafkaContinuousTask<I, O> {

    private final AtomicBoolean closed;
    private final AtomicBoolean paused;
    private Consumer<O> consumer;

    public ContinousFuturisingKafkaTask(R resource, I input) {
        super(resource, input);
        this.closed = new AtomicBoolean();
        this.paused = new AtomicBoolean();
        this.consumer = message -> logger.warn("No consumer attached to kafka task");
    }

    @Override
    protected CompletableFuture<Void> delegateExecute() {
        return FutureUtils.supplyAsync(this::delegateExecuteSync);
    }

    protected abstract Void delegateExecuteSync();

    public void close() {
        logger.info("Task set to close, closing...");
        this.closed.set(true);
    }

    @Override
    public void registerConsumer(Consumer<O> consumer) {
        this.consumer = consumer;
    }

    public boolean isClosed() {
        return this.closed.get();
    }

    public void pause() {
        this.paused.set(true);
    }

    public boolean isPaused() {
        return this.paused.get();
    }

    protected void forward(O input) {
        this.consumer.accept(input);
    }

    public void update(I input) {
        //Do Nothing
    }
}

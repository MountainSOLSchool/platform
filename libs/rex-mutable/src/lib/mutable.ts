export const mutable = <M extends object>(
    model: M,
    config: {
        onChange: <P extends keyof M>(
            property: P,
            value: M[P],
            model: M
        ) => void;
    }
) => {
    return createModelProxy(model);

    function createModelProxy(target: M): M {
        const dispatch: ProxyHandler<M> = {
            set(target, prop, value) {
                Object.assign(target, { [prop]: value });
                console.log(`set ${String(prop)} to ${value}`);
                config.onChange(prop as keyof M, value, target);
                return true;
            },
        };
        return new Proxy(target, dispatch) as M;
    }
};

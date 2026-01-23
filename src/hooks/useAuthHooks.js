import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginService, registerService, logoutService, getMeService, updateProfileService, updateAvatarService, googleLoginService } from "../service/AuthService";

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMeService,
        select: (data) => data?.data?.user,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 mins
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: registerService,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutService,
        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            queryClient.invalidateQueries(["user"]);
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfileService,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
            queryClient.invalidateQueries(["user"]);
        },
    });
};

export const useGoogleLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: googleLoginService,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });
};

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAvatarService,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
            queryClient.invalidateQueries(["user"]);
        },
    });
};

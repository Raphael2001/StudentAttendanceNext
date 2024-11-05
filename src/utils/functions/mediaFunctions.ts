import ApiValidationService from "services/ApiValidationService";

export function getMediaPath(src) {
  return `${ApiValidationService.getCdn()}/${src}`;
}
